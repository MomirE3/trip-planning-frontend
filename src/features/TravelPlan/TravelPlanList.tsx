import { useTranslation } from 'react-i18next'
import {
  BaseButton,
  BaseCard,
  BaseCol,
  BaseDataTable,
  BaseParagraph,
  BaseRow,
  BaseTableFilters,
  BaseText,
  BaseTitle,
} from '../../shared/ui'
import { TravelPlanFormModal } from './TravelPlanFormModal'
import { useTravelPlanList } from './useTravelPlanList'
import type { TravelPlanDto, TravelPlanFilters } from './travelPlan.types'

export function TravelPlanList() {
  const { t } = useTranslation()
  const {
    columns,
    closeForm,
    editingPlan,
    filteredPlans,
    filterFields,
    filters,
    isFetching,
    isFormOpen,
    isSubmitting,
    openCreateForm,
    resetFilters,
    submitTravelPlan,
    travelPlans,
    upcomingPlans,
    updateFilter,
  } = useTravelPlanList()

  return (
    <section className="travel-page">
      <div className="page-heading">
        <div>
          <BaseTitle level={1}>{t('travelPlanning.travelPlans.title')}</BaseTitle>
          <BaseParagraph type="secondary">
            {t('travelPlanning.travelPlans.description')}
          </BaseParagraph>
        </div>
        <BaseButton onClick={openCreateForm} type="primary">
          {t('travelPlanning.travelPlans.new')}
        </BaseButton>
      </div>

      <BaseRow gutter={[16, 16]}>
        <BaseCol md={8} xs={24}>
          <BaseCard>
            <BaseText type="secondary">{t('travelPlanning.travelPlans.stats.total')}</BaseText>
            <BaseTitle level={2}>{travelPlans.length}</BaseTitle>
          </BaseCard>
        </BaseCol>
        <BaseCol md={8} xs={24}>
          <BaseCard>
            <BaseText type="secondary">{t('travelPlanning.travelPlans.stats.visible')}</BaseText>
            <BaseTitle level={2}>{filteredPlans.length}</BaseTitle>
          </BaseCard>
        </BaseCol>
        <BaseCol md={8} xs={24}>
          <BaseCard>
            <BaseText type="secondary">{t('travelPlanning.travelPlans.stats.upcoming')}</BaseText>
            <BaseTitle level={2}>{upcomingPlans}</BaseTitle>
          </BaseCard>
        </BaseCol>
      </BaseRow>

      <BaseCard className="table-card">
        <BaseTableFilters<TravelPlanFilters>
          fields={filterFields}
          onChange={updateFilter}
          onReset={resetFilters}
          resetLabel={t('travelPlanning.common.resetFilters')}
          values={filters}
        />

        <BaseDataTable<TravelPlanDto>
          columns={columns}
          dataSource={filteredPlans}
          loading={isFetching}
          rowKey="id"
        />
      </BaseCard>

      <TravelPlanFormModal
        initialValues={editingPlan}
        isSubmitting={isSubmitting}
        onCancel={closeForm}
        onSubmit={submitTravelPlan}
        open={isFormOpen}
        title={
          editingPlan
            ? t('travelPlanning.travelPlans.editTitle')
            : t('travelPlanning.travelPlans.createTitle')
        }
      />
    </section>
  )
}
