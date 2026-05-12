import { EntityTableSection } from '../shared'
import { ActivityFormModal } from './ActivityFormModal'
import { useActivitiesTable } from './useActivitiesTable'
import type { ActivitiesTableProps, ActivityDto, ActivityFilters } from './activities.types'

export function ActivitiesTable({ activities, travelPlanId }: ActivitiesTableProps) {
  const {
    closeForm,
    columns,
    editingActivity,
    filteredActivities,
    filterFields,
    filters,
    isFormOpen,
    isSubmitting,
    openCreateForm,
    resetFilters,
    submitActivity,
    t,
    updateFilter,
  } = useActivitiesTable(activities, travelPlanId)

  return (
    <>
      <EntityTableSection<ActivityDto, ActivityFilters>
        addButtonLabel={t('travelPlanning.activities.new')}
        columns={columns}
        dataSource={filteredActivities}
        filterFields={filterFields}
        filters={filters}
        onAdd={openCreateForm}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        resetFiltersLabel={t('travelPlanning.common.resetFilters')}
        rowKey="id"
      />

      <ActivityFormModal
        initialValues={editingActivity}
        isSubmitting={isSubmitting}
        onCancel={closeForm}
        onSubmit={submitActivity}
        open={isFormOpen}
        title={
          editingActivity
            ? t('travelPlanning.activities.editTitle')
            : t('travelPlanning.activities.createTitle')
        }
      />
    </>
  )
}
