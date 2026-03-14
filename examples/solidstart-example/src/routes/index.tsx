import { Avatar } from "@avatune/solidjs"
import theme from "@avatune/pacovqzz-theme/solidjs"

export default function Home() {
  return (
    <div style={{ display: "flex", "flex-wrap": "wrap", "align-items": "center", gap: "3rem", padding: "2rem" }}>
      <Avatar size={64} theme={theme} seed="solidstart-1" />
      <Avatar size={64} theme={theme} seed="solidstart-2" />
      <Avatar size={64} theme={theme} seed="solidstart-3" />
      <Avatar size={64} theme={theme} seed="solidstart-4" />
      <Avatar size={64} theme={theme} seed="solidstart-5" />
    </div>
  )
}
