import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import Todo from './Todo';

describe('Todo', () => {
  it('renders', async () => {
    render(<Todo
      todo={{text: 'test', done: false}}
      onClickComplete={() => {}}
      onClickDelete={() => {}}
    />)

    const todo = await screen.findByText("test")

    expect(todo).not.toBeNull()
  })
})