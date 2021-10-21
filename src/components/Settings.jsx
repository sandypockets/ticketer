export default function Settings({ setPage }) {
  return (
    <>
      <h1>Settings</h1>
      <a onClick={() => setPage('home')}>Back</a>
    </>
  )
}