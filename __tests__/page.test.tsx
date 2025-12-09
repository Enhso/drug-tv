import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    // The actual text in app/page.tsx is "To get started, edit the page.tsx file."
    // We check for a substring that matches the user's intent.
    expect(heading).toHaveTextContent(/To get started, edit/i)
  })
})
