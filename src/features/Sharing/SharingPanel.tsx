import { List, Popconfirm, Select } from 'antd'
import { BaseButton, BaseSpace, BaseText, BaseTitle } from '../../shared/ui'
import { formatDateTime } from '../../shared/utils/date'
import type { AccessType } from '../../shared/constants/accessType'
import type { SharingPanelProps } from './sharing.types'
import { useAccessTypeOptions } from './useAccessTypeOptions'
import { useSharingPanel } from './useSharingPanel'

export function SharingPanel({ travelPlanId }: SharingPanelProps) {
  const accessTypeOptions = useAccessTypeOptions()
  const {
    accessType,
    copyShareLink,
    createShareLink,
    expiresAt,
    getAccessTypeLabel,
    isCreating,
    isFetching,
    isRevoking,
    revokeShareLink,
    setAccessType,
    setExpiresAt,
    t,
    tokens,
  } = useSharingPanel(travelPlanId)

  return (
    <div className="sharing-panel">
      <BaseTitle level={4}>{t('travelPlanning.sharing.title')}</BaseTitle>
      <BaseText type="secondary">{t('travelPlanning.sharing.description')}</BaseText>

      <div className="sharing-create">
        <label className="sharing-field">
          <span>{t('travelPlanning.sharing.fields.accessType')}</span>
          <Select<AccessType>
            onChange={setAccessType}
            options={accessTypeOptions}
            style={{ width: '100%' }}
            value={accessType}
          />
        </label>
        <label className="sharing-field">
          <span>{t('travelPlanning.sharing.fields.expiresAt')}</span>
          <input
            onChange={(event) => setExpiresAt(event.target.value)}
            type="datetime-local"
            value={expiresAt}
          />
        </label>
        <BaseButton loading={isCreating} onClick={() => void createShareLink()} type="primary">
          {t('travelPlanning.sharing.createLink')}
        </BaseButton>
      </div>

      <List
        className="sharing-list"
        dataSource={tokens}
        loading={isFetching}
        locale={{ emptyText: t('travelPlanning.sharing.empty') }}
        renderItem={(token) => (
          <List.Item
            actions={[
              <BaseButton key="copy" onClick={() => void copyShareLink(token.token)} type="link">
                {t('travelPlanning.sharing.copyLink')}
              </BaseButton>,
              <Popconfirm
                cancelText={t('travelPlanning.common.cancel')}
                key="revoke"
                okText={t('travelPlanning.sharing.revoke')}
                onConfirm={() => void revokeShareLink(token.id)}
                title={t('travelPlanning.sharing.revokeConfirm')}
              >
                <BaseButton danger loading={isRevoking} type="link">
                  {t('travelPlanning.sharing.revoke')}
                </BaseButton>
              </Popconfirm>,
            ]}
          >
            <BaseSpace direction="vertical" size={4}>
              <BaseText>
                <strong>{t('travelPlanning.sharing.fields.accessType')}:</strong>{' '}
                {getAccessTypeLabel(token.accessType)}
              </BaseText>
              <BaseText type="secondary">
                {t('travelPlanning.sharing.createdAt')}: {formatDateTime(token.createdAt)}
              </BaseText>
              {token.expiresAt ? (
                <BaseText type="secondary">
                  {t('travelPlanning.sharing.expiresAt')}: {formatDateTime(token.expiresAt)}
                </BaseText>
              ) : null}
            </BaseSpace>
          </List.Item>
        )}
      />
    </div>
  )
}
