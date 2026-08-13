import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  NotificationItem,
  getNotifications,
  getUnreadNotificationCount,
  markNotificationRead,
  markAllNotificationsRead,
  clearReadNotifications,
} from "./api";
import { getAccessToken } from "./auth";

export function useNotifications() {
  const [notifs, setNotifs] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch initial REST data
  useEffect(() => {
    async function initFetch() {
      setLoading(true);
      try {
        const [listRes, countRes] = await Promise.all([
          getNotifications(1, 100), // Get a decent batch initially
          getUnreadNotificationCount(),
        ]);
        setNotifs(listRes.results);
        setUnreadCount(countRes.unread_count);
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    }
    initFetch();
  }, []);

  // WebSocket connection
  useEffect(() => {
    let reconnectTimer: NodeJS.Timeout;
    
    function connect() {
      const token = getAccessToken();
      if (!token) return;

      const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
      if (!baseUrl) return;

      const wsUrl = baseUrl.replace(/^http/, "ws") + `/ws/notifications/?token=${token}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Assuming data is the NotificationItem itself
          setNotifs((prev) => [data, ...prev]);
          setUnreadCount((prev) => prev + 1);
        } catch (err) {
          console.error("Failed to parse websocket message", err);
        }
      };

      ws.onclose = () => {
        // Try to reconnect in 5 seconds
        reconnectTimer = setTimeout(connect, 5000);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        ws.close();
      };
    }

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (wsRef.current) {
        wsRef.current.onclose = null; // Prevent reconnect on unmount
        wsRef.current.close();
      }
    };
  }, []);

  const markRead = useCallback(async (id: string) => {
    // Optimistic update
    setNotifs((prev) =>
      prev.map((n) => (n.id === id && !n.is_read ? { ...n, is_read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await markNotificationRead(id);
    } catch (err) {
      toast.error("Failed to mark read");
      // Revert optimism if needed (ignoring for simplicity)
    }
  }, []);

  const markAllRead = useCallback(async () => {
    if (unreadCount === 0) return;
    
    // Optimistic update
    setNotifs((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);

    try {
      await markAllNotificationsRead();
      toast.success("All notifications marked as read");
    } catch (err) {
      toast.error("Failed to mark all read");
    }
  }, [unreadCount]);

  const clearRead = useCallback(async () => {
    // Optimistic update
    setNotifs((prev) => prev.filter((n) => !n.is_read));

    try {
      const res = await clearReadNotifications();
      toast.success(`Cleared ${res.deleted_count} read notifications`);
    } catch (err) {
      toast.error("Failed to clear read notifications");
    }
  }, []);

  return {
    notifs,
    unreadCount,
    loading,
    markRead,
    markAllRead,
    clearRead,
  };
}
