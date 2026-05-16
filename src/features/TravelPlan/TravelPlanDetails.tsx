import { Alert, Tabs } from 'antd';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { routes } from '../../config/routes';
import {
	ShareAccessProvider,
	useShareAccess,
} from '../../shared/contexts/ShareAccessContext';
import { shareTokenStorage } from '../../shared/services/shareTokenStorage';
import {
	BaseButton,
	BaseCard,
	BaseParagraph,
	BaseSpace,
	BaseText,
	BaseTitle,
} from '../../shared/ui';
import { formatDate } from '../../shared/utils/date';
import { decimalFormatter } from '../../shared/utils/number';
import { ActivitiesTable } from '../Activities';
import { ChecklistPanel } from '../Checklist';
import { DestinationsTable } from '../Destinations';
import { ExpensesTable } from '../Expenses';
import { SharingPanel } from '../Sharing';
import { useTravelPlanDetails } from './useTravelPlanDetails';
import { getBudgetSummary } from './travelPlan.utils';

interface TravelPlanDetailsContentProps {
	showBack?: boolean;
	travelPlanId: number;
}

export function TravelPlanDetailsContent({
	showBack = false,
	travelPlanId,
}: TravelPlanDetailsContentProps) {
	const { isSharedView } = useShareAccess();
	const { data, error, goBack, isFetching, t } =
		useTravelPlanDetails(travelPlanId);

	const travelPlan = data;
	const budgetSummary = travelPlan
		? getBudgetSummary(travelPlan.budget, data?.expenses ?? [])
		: null;

	return (
		<>
			<div className='page-heading'>
				<div>
					{showBack ? (
						<BaseButton onClick={goBack}>
							{t('travelPlanning.travelPlanDetails.back')}
						</BaseButton>
					) : null}
					<BaseTitle level={1}>
						{travelPlan?.name ?? t('travelPlanning.travelPlanDetails.title')}
					</BaseTitle>
					<BaseParagraph type='secondary'>
						{travelPlan
							? `${formatDate(travelPlan.startDate)} - ${formatDate(travelPlan.endDate)}`
							: t('travelPlanning.travelPlanDetails.loading')}
					</BaseParagraph>
				</div>
			</div>

			{error ? (
				<Alert
					message={t('travelPlanning.travelPlanDetails.loadError')}
					showIcon
					type='error'
				/>
			) : (
				<BaseCard className='table-card' loading={isFetching && !data}>
					{travelPlan ? (
						<BaseSpace className='plan-summary' size={24} wrap>
							<BaseText>
								<strong>
									{t('travelPlanning.travelPlans.fields.startDate')}:
								</strong>{' '}
								{formatDate(travelPlan.startDate)}
							</BaseText>
							<BaseText>
								<strong>
									{t('travelPlanning.travelPlans.fields.endDate')}:
								</strong>{' '}
								{formatDate(travelPlan.endDate)}
							</BaseText>
							<BaseText>
								<strong>
									{t('travelPlanning.travelPlans.fields.budget')}:
								</strong>{' '}
								{decimalFormatter.format(travelPlan.budget)}
							</BaseText>
							<BaseText>
								<strong>{t('travelPlanning.travelPlanDetails.spent')}:</strong>{' '}
								{decimalFormatter.format(budgetSummary?.spent ?? 0)}
							</BaseText>
							<BaseText
								type={
									budgetSummary && budgetSummary.remaining < 0
										? 'danger'
										: undefined
								}
							>
								<strong>
									{t('travelPlanning.travelPlanDetails.remaining')}:
								</strong>{' '}
								{decimalFormatter.format(budgetSummary?.remaining ?? 0)}
							</BaseText>
							<BaseText>
								<strong>
									{t('travelPlanning.travelPlans.fields.description')}:
								</strong>{' '}
								{travelPlan.description}
							</BaseText>
						</BaseSpace>
					) : null}

					<Tabs
						items={[
							{
								children: (
									<DestinationsTable
										destinations={data?.destinations ?? []}
										travelPlanId={travelPlanId}
									/>
								),
								key: 'destinations',
								label: t('travelPlanning.destinations.title'),
							},
							{
								children: (
									<ActivitiesTable
										activities={data?.activities ?? []}
										travelPlanId={travelPlanId}
									/>
								),
								key: 'activities',
								label: t('travelPlanning.activities.title'),
							},
							{
								children: (
									<ExpensesTable
										expenses={data?.expenses ?? []}
										travelPlanId={travelPlanId}
									/>
								),
								key: 'expenses',
								label: t('travelPlanning.expenses.title'),
							},
							{
								children: (
									<ChecklistPanel
										items={data?.checklist ?? []}
										travelPlanId={travelPlanId}
									/>
								),
								key: 'checklist',
								label: t('travelPlanning.checklist.title'),
							},
							...(!isSharedView
								? [
										{
											children: <SharingPanel travelPlanId={travelPlanId} />,
											key: 'sharing',
											label: t('travelPlanning.sharing.title'),
										},
									]
								: []),
						]}
					/>
				</BaseCard>
			)}
		</>
	);
}

export function TravelPlanDetails() {
	const { isValidTravelPlanId, travelPlanId } = useTravelPlanDetails();

	useEffect(() => {
		shareTokenStorage.clearShareToken();
	}, []);

	if (!isValidTravelPlanId) {
		return <Navigate replace to={routes.trips} />;
	}

	return (
		<ShareAccessProvider canWrite isSharedView={false}>
			<section className='travel-page'>
				<TravelPlanDetailsContent showBack travelPlanId={travelPlanId} />
			</section>
		</ShareAccessProvider>
	);
}
