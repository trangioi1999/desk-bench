import styles from './TerminalApp.module.css'

function PromptLine({ cmd }: { cmd: string }) {
  return (
    <div>
      <span className={styles.path}>~/desktop</span> <span className={styles.chevron}>❯</span> {cmd}
    </div>
  )
}

export function TerminalApp() {
  return (
    <div className={styles.body}>
      <PromptLine cmd="npm run dev" />
      <div className={styles.output}>&nbsp;&nbsp;vite v5.4.0&nbsp;&nbsp;ready in 312 ms</div>
      <div className={styles.output}>&nbsp;&nbsp;➜&nbsp;&nbsp;Local:&nbsp;&nbsp;&nbsp;http://localhost:5173/</div>
      <div className={styles.gap} />
      <PromptLine cmd="git status" />
      <div className={styles.output}>
        &nbsp;&nbsp;On branch <span className={styles.branch}>feature/glass-ui</span>
      </div>
      <div className={styles.output}>&nbsp;&nbsp;2 files changed, 148 insertions(+)</div>
      <div className={styles.gap} />
      <div>
        <span className={styles.path}>~/desktop</span> <span className={styles.chevron}>❯</span>{' '}
        <span className={styles.cursor} />
      </div>
    </div>
  )
}
