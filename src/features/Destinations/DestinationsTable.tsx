import { EntityTableSection } from '../../shared/ui'
import { DestinationFormModal } from './DestinationFormModal'
import { useDestinationsTable } from './useDestinationsTable'
import type { DestinationDto, DestinationFilters, DestinationsTableProps } from './destinations.types'

export function DestinationsTable({ destinations, travelPlanId }: DestinationsTableProps) {
  const {
    closeForm,
    columns,
    editingDestination,
    filteredDestinations,
    filterFields,
    filters,
    isFormOpen,
    isSubmitting,
    openCreateForm,
    resetFilters,
    submitDestination,
    t,
    updateFilter,
  } = useDestinationsTable(destinations, travelPlanId)

  return (
    <>
      <EntityTableSection<DestinationDto, DestinationFilters>
        addButtonLabel={t('travelPlanning.destinations.new')}
        columns={columns}
        dataSource={filteredDestinations}
        filterFields={filterFields}
        filters={filters}
        onAdd={openCreateForm}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        resetFiltersLabel={t('travelPlanning.common.resetFilters')}
        rowKey="id"
      />

      <DestinationFormModal
        initialValues={editingDestination}
        isSubmitting={isSubmitting}
        onCancel={closeForm}
        onSubmit={submitDestination}
        open={isFormOpen}
        title={
          editingDestination
            ? t('travelPlanning.destinations.editTitle')
            : t('travelPlanning.destinations.createTitle')
        }
      />
    </>
  )
}
