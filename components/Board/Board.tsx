import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import Card, { BoardCard } from './Card'

export interface BoardSection {
  title: string
  id: string // enum
}

interface Props<T> {
  sections: BoardSection[]
  cards: BoardCard<T>[]
  onChange: (changedCard: BoardCard<T>) => void
}

const KanbanBoard = <T extends object>({
  sections,
  cards,
  onChange,
}: Props<T>) => {
  const [localCards, setLocalCards] = useState(cards)
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

  const cardsBySection: { [sectionId: string]: BoardCard<T>[] } = {}
  const cardsById: { [cardId: string]: BoardCard<T> } = {}
  for (const card of localCards) {
    if (!cardsBySection[card.sectionId]) cardsBySection[card.sectionId] = []
    cardsBySection[card.sectionId].push(card)
    cardsById[card.id] = card
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-auto">
        <div className="flex gap-1 items-start min-w-0 w-fit">
          {sections.map((section) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className="flex flex-col gap-2 p-4 w-64 max-w-xs h-full rounded-lg bg-base-200"
                  ref={provided.innerRef}
                >
                  <div className="text-xs font-bold uppercase">
                    {section.title}
                  </div>
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
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard
