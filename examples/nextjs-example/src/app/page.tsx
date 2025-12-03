import { Avatar as AvatuneAvatar } from "@avatune/react";
import theme from "@avatune/pacovqzz-theme/react";

export default function Home() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <AvatuneAvatar
        size={64}
        theme={theme}
        seed="https://github.com/shadcn.png?12"
      />
      <AvatuneAvatar
        size={64}
        theme={theme}
        seed="https://github.com/shadcn.png?34"
      />
      <AvatuneAvatar
        size={64}
        theme={theme}
        seed="https://github.com/shadcn.png?56"
      />
      <AvatuneAvatar
        size={64}
        theme={theme}
        seed="https://github.com/shadcn.png?78"
      />
      <AvatuneAvatar
        size={64}
        theme={theme}
        seed="https://github.com/shadcn.png?90"
      />
    </div>
  );
}
