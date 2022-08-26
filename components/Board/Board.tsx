import { PlusIcon } from '@heroicons/react/outline'
import { ReactNode, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import Card, { BoardCard } from './Card'

const isString = (val: unknown) =>
  typeof val === 'string' || val instanceof String

export interface BoardSection {
  title: string | ReactNode
  id: string // enum
}

interface Props<T> {
  sections: BoardSection[]
  cards: BoardCard<T>[]
  onChange: (changedCard: BoardCard<T>) => void
  handleAdd?: (sectionId: string) => void
}

const KanbanBoard = <T extends object>({
  sections,
  cards,
  onChange,
  handleAdd,
}: Props<T>) => {
  const [localCards, setLocalCards] = useState<BoardCard<T>[]>([])
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const newCard = {
        ...cardsById[result.draggableId],
        sectionId: destination.droppableId,
      }
      onChange(newCard)
      setLocalCards([
        ...localCards.filter((c) => c.id !== result.draggableId),
        newCard,
      ])
    }
  }

  useEffect(() => {
    setLocalCards(cards)
  }, [cards])

  const cardsBySection: { [sectionId: string]: BoardCard<T>[] } = {}
  const cardsById: { [cardId: string]: BoardCard<T> } = {}
  for (const card of localCards) {
    if (!cardsBySection[card.sectionId]) cardsBySection[card.sectionId] = []
    cardsBySection[card.sectionId].push(card)
    cardsById[card.id] = card
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-1 items-start min-w-0 w-fit">
        {sections.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="flex flex-col gap-2 p-4 w-64 max-w-xs h-full rounded-lg bg-base-200"
                ref={provided.innerRef}
              >
                {isString(section.title) ? (
                  <div className="text-xs font-bold uppercase">
                    {section.title}
                  </div>
                ) : (
                  section.title
                )}

                {(cardsBySection[section.id] || [])
                  .sort((a, b) => (b.sortBy || 0) - (a.sortBy || 0))
                  .map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? '0.5' : '1',
                          }}
                        >
                          <Card {...card}></Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                {handleAdd && (
                  <>
                    <button
                      onClick={() => handleAdd(section.id)}
                      className="flex gap-2 items-center w-full btn btn-sm btn-ghost"
                    >
                      <PlusIcon className="w-4 h-4" />
                      New
                    </button>
                  </>
                )}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard
