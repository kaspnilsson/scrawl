/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { Extension, Editor } from '@tiptap/core'
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion'
import { ReactRenderer, Range } from '@tiptap/react'
import tippy, { Instance } from 'tippy.js'

export interface SlashCommandsCommand {
  title: string
  description: string
  icon: JSX.Element
  command: ({ editor, range }: { editor: Editor; range?: Range }) => void
  isEnabled?: (editor: Editor) => boolean
}

export const SlashCommands = Extension.create<{
  commands: SlashCommandsCommand[]
  filterCommands: (
    commands: SlashCommandsCommand[],
    query: string,
    editor: Editor
  ) => SlashCommandsCommand[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
  suggestion: Partial<SuggestionOptions>
}>({
  name: 'slash-command',

  addOptions() {
    return {
      commands: [],
      filterCommands: (commands, query, editor) => {
        return commands
          .filter((item) =>
            item.title.toLowerCase().startsWith(query.toLowerCase())
          )
          .filter((item) => (item.isEnabled ? item.isEnabled(editor) : true))
          .slice(0, 10)
      },
      component: null,
      suggestion: {
        char: '/',
        startOfLine: true,
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: (query) =>
          this.options.filterCommands(
            this.options.commands,
            query.query,
            this.editor
          ),
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor
          range: Range
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          props: any
        }) => {
          props.command({ editor, range })
        },
        render: () => {
          let component: ReactRenderer
          let popup: Instance[]

          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandsListController, {
                editor: props.editor,
                props: { ...props, component: this.options.component },
              })

              // @ts-ignore - unneeded DOMRect properties
              popup = tippy('body', {
                getReferenceClientRect: props.clientRect || null,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
                arrow: false,
              })
            },
            onUpdate: (props) => {
              component.updateProps({
                ...props,
                component: this.options.component,
              })

              popup[0].setProps({
                // @ts-ignore - unneeded DOMRect properties
                getReferenceClientRect: props.clientRect || null,
              })
            },
            onKeyDown(props) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return (component.ref as any)?.onKeyDown(props)
            },
            onExit() {
              popup[0].destroy()
              component.destroy()
            },
          }
        },
      }),
    ]
  },
})

export class CommandsListController extends React.Component<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { items: any[]; command: (item: any) => void; component: any },
  { selectedIndex: number }
> {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super()
    this.state = {
      selectedIndex: 0,
    }
    this.selectItem = this.selectItem.bind(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onKeyDown({ event }: any) {
    if (event.key === 'ArrowUp') {
      this.upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      this.downHandler()
      return true
    }

    if (event.key === 'Enter') {
      this.enterHandler()
      return true
    }

    return false
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    })
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    })
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  selectItem(index: number) {
    const item = this.props.items[index]

    if (item) {
      this.props.command(item)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidUpdate(prevProps: any) {
    if (prevProps.items.length !== this.props.items.length) {
      this.setState({ selectedIndex: 0 })
    }
  }

  render() {
    const { items, component: Component } = this.props
    const { selectedIndex } = this.state

    return (
      <Component
        items={items}
        selectedIndex={selectedIndex}
        selectItem={this.selectItem}
      />
    )
  }
}
