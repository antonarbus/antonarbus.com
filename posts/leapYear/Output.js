export function Output({ yearTypeState }) {
  return (
    <div data-testid="output">
      {yearTypeState === null && <span style={{ color: 'grey' }}>Year is not provided</span>}
      {yearTypeState === 'leap' && <span style={{ color: 'green' }}>Yes</span>}
      {yearTypeState === 'not leap' && <span style={{ color: 'red' }}>No</span>}
      {yearTypeState === 'too large number' && <span style={{ color: 'blue' }}>The Earth doesn't exist anymore 😞</span>}
      {yearTypeState === 'too small number' && <span style={{ color: 'blue' }}>The Earth is not formed yet 😞</span>}
    </div>
  )
}
