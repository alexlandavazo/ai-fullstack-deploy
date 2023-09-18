import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'
vi.mock('@clerk/nextjs', () => ({
  auth: () => new Promise((resolve) => resolve({ userId: 'test_user_id' })),
  ClerkProvider: ({ children }) => <div>{children}</div>,
  useUser: () => ({
    isSignedId: true,
    user: {
      id: 'user_1231232123132132112312',
      fullName: 'John Doe',
    },
  }),
}))

test('Home', async () => {
  render(await HomePage())
  expect(screen.getByText('Get started')).toBeTruthy()
})
