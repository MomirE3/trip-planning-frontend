import { Checkbox, Input, List, Popconfirm } from 'antd'
import { BaseButton, BaseSpace, BaseText } from '../../shared/ui'
import type { ChecklistPanelProps } from './checklist.types'
import { useChecklist } from './useChecklist'

export function ChecklistPanel({ items, travelPlanId }: ChecklistPanelProps) {
  const {
    addItem,
    canWrite,
    completedCount,
    isCreating,
    isDeleting,
    newItemContent,
    removeItem,
    setNewItemContent,
    sortedItems,
    t,
    totalCount,
    toggleItem,
  } = useChecklist(items, travelPlanId)

  return (
    <div className="checklist-panel">
      <BaseText className="checklist-summary">
        {t('travelPlanning.checklist.progress', {
          completed: completedCount,
          total: totalCount,
        })}
      </BaseText>

      {canWrite ? (
        <BaseSpace className="checklist-add" size={12}>
          <Input
            onChange={(event) => setNewItemContent(event.target.value)}
            onPressEnter={() => void addItem()}
            placeholder={t('travelPlanning.checklist.placeholders.content')}
            value={newItemContent}
          />
          <BaseButton loading={isCreating} onClick={() => void addItem()} type="primary">
            {t('travelPlanning.checklist.add')}
          </BaseButton>
        </BaseSpace>
      ) : null}

      <List
        className="checklist-list"
        dataSource={sortedItems}
        locale={{ emptyText: t('travelPlanning.checklist.empty') }}
        renderItem={(item) => (
          <List.Item
            actions={
              canWrite
                ? [
                    <Popconfirm
                      cancelText={t('travelPlanning.common.cancel')}
                      key="delete"
                      okText={t('travelPlanning.common.delete')}
                      onConfirm={() => void removeItem(item.id)}
                      title={t('travelPlanning.checklist.deleteConfirm')}
                    >
                      <BaseButton danger loading={isDeleting} type="link">
                        {t('travelPlanning.common.delete')}
                      </BaseButton>
                    </Popconfirm>,
                  ]
                : undefined
            }
          >
            <Checkbox
              checked={item.isCompleted}
              disabled={!canWrite}
              onChange={() => void toggleItem(item)}
            >
              <span className={item.isCompleted ? 'checklist-item-completed' : undefined}>
                {item.content}
              </span>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  )
}
