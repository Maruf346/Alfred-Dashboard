import svgPaths from "./svg-4glu5eweio";
import imgAlfredAiLogo from "./0dc730138662beaba46745def54886a28fc45d1e.png";

function Container() {
  return (
    <div className="h-[56px] max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid max-w-[inherit] relative size-full" />
      </div>
    </div>
  );
}

function HeaderTopNavBar() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full z-[3]" data-name="Header - TopNavBar">
      <div aria-hidden className="absolute border-[rgba(207,196,197,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function AlfredAiLogo() {
  return (
    <div className="relative shrink-0 size-[80px]" data-name="Alfred AI Logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAlfredAiLogo} />
      </div>
    </div>
  );
}

function LogoSection() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Logo Section">
      <div className="absolute left-[-8px] rounded-[9999px] size-[96px] top-[-8px]" data-name="Subtle circular accent behind logo">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9999px]" />
      </div>
      <AlfredAiLogo />
    </div>
  );
}

function LogoSectionMargin() {
  return (
    <div className="h-[88px] relative shrink-0" data-name="Logo Section:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[48px] relative size-full">
        <LogoSection />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black text-center tracking-[-0.8px] whitespace-nowrap">
        <p className="leading-[40px]">Welcome Back</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[300px] relative shrink-0 w-[300px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#585f6c] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Sign in to manage your Alfred AI platform.</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center relative size-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(126,117,118,0.5)] w-full">
          <p className="leading-[normal]">admin@alfred.ai</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[17px] pt-[16px] px-[17px] relative size-full">
          <Container2 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(207,196,197,0.6)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function EmailField() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start pt-[6px] relative shrink-0 w-full" data-name="Email Field">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4c4546] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">EMAIL ADDRESS</p>
      </div>
      <Input />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4c4546] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">PASSWORD</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(88,95,108,0.7)] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Forgot?</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Label />
          <Link />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(126,117,118,0.5)] w-full">
          <p className="leading-[normal]">••••••••</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[17px] pt-[16px] px-[17px] relative size-full">
          <Container5 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(207,196,197,0.6)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[18.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 12.5">
        <g id="Container">
          <path d={svgPaths.p2e870a60} fill="var(--fill-0, #585F6C)" fillOpacity="0.4" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bottom-[33.5%] content-stretch flex flex-col items-center justify-center pb-[0.37px] pt-[3.63px] right-[16px] top-[33.5%]" data-name="Button">
      <Container6 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Button />
    </div>
  );
}

function PasswordField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Password Field">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#585f6c] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Remember this device</p>
      </div>
    </div>
  );
}

function RememberMeCheckbox() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Remember Me & Checkbox">
      <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#cfc4c5] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <Label1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p304eaa0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ActionButton() {
  return (
    <div className="bg-black content-stretch flex gap-[8px] items-center justify-center px-px py-[17px] relative rounded-[2px] shrink-0 w-full" data-name="Action Button">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Sign In</p>
      </div>
      <Container7 />
    </div>
  );
}

function LoginForm() {
  return (
    <div className="relative shrink-0 w-full" data-name="Login Form">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[48px] items-start relative size-full">
        <EmailField />
        <PasswordField />
        <RememberMeCheckbox />
        <ActionButton />
      </div>
    </div>
  );
}

function BottomNote() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Bottom Note">
      <div aria-hidden className="absolute border-[rgba(207,196,197,0.3)] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function OverlayBorderShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col gap-[48px] items-center max-w-[460px] p-[49px] relative rounded-[4px] shrink-0 w-[460px]" data-name="Overlay+Border+Shadow+OverlayBlur">
      <div aria-hidden className="absolute border border-[rgba(207,196,197,0.4)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_20px_50px_0px_rgba(0,0,0,0.04),0px_4px_12px_0px_rgba(0,0,0,0.02)]" />
      <LogoSectionMargin />
      <HeaderSection />
      <LoginForm />
      <BottomNote />
    </div>
  );
}

function MainContentLoginCanvas() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip py-[84.5px] relative shrink-0 w-full z-[2]" data-name="Main Content: Login Canvas">
      <OverlayBorderShadowOverlayBlur />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(88,95,108,0.6)] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">© 2026 Alfred AI. All rights reserved.</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[40px] py-[48px] relative size-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function FooterComponent() {
  return (
    <div className="content-stretch flex flex-col items-start pt-px relative shrink-0 w-full z-[1]" data-name="Footer Component">
      <div aria-hidden className="absolute border-[rgba(207,196,197,0.3)] border-solid border-t inset-0 pointer-events-none" />
      <Container8 />
    </div>
  );
}

export default function AlfredAiModernAdminLogin() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1280 1160' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(181.02 0 0 164.05 0 0)'><stop stop-color='rgba(242,242,242,1)' offset='0'/><stop stop-color='rgba(242,242,242,0)' offset='0.5'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1280 1160' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(90.51 0 0 164.05 640 0)'><stop stop-color='rgba(250,250,250,1)' offset='0'/><stop stop-color='rgba(250,250,250,0)' offset='0.5'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1280 1160' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(181.02 0 0 164.05 1280 0)'><stop stop-color='rgba(245,245,245,1)' offset='0'/><stop stop-color='rgba(245,245,245,0)' offset='0.5'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(251, 251, 251) 0%, rgb(251, 251, 251) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Alfred AI Modern Admin Login">
      <HeaderTopNavBar />
      <MainContentLoginCanvas />
      <FooterComponent />
    </div>
  );
}