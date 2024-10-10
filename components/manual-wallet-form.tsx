import CustomSelect from './customs/custom-select'
import { FormField } from './customs/custom-form'
import { Input } from './ui/input'
import { optionValueToBlockchainName } from '@/lib/helper-func'
import type { UseFormReturn } from 'react-hook-form'

export function ManualWalletForm({
  form,
  name,
}: {
  form: UseFormReturn<any>
  name?: string
}) {
  const getFieldName = (fieldName: string) =>
    name ? `${name}.${fieldName}` : fieldName

  return (
    <>
      <FormField
        name={getFieldName('walletAddress')}
        showMessage={false}
        label="Wallet Address"
        form={form}
      >
        <Input
          placeholder="Enter wallet address"
          className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
        />
      </FormField>
      <FormField
        name={getFieldName('chain')}
        label="Select Chain"
        form={form}
        showMessage={false}
      >
        {(field) => (
          <CustomSelect
            value={field.value}
            onChange={field.onChange}
            placeholder="Select a chain"
            options={Object.entries(optionValueToBlockchainName).map(
              ([value, name]) => ({
                value,
                label: name,
              }),
            )}
          />
        )}
      </FormField>
    </>
  )
}
