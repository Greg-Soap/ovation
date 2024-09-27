import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { optionValueToBlockchainName } from '@/lib/helper-func'

export default function RenderWalletAndConfirmation({
  form,
  handleFormSubmit,
  isPending,
}: any) {
  return (
    <form
      onSubmit={form.handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-7"
    >
      <FormField
        control={form.control}
        name="userWallet.walletAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Wallet Address</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                placeholder="Enter your wallet address"
                type="text"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="userWallet.chain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Chain</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(optionValueToBlockchainName).map(
                  ([value, name]) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className=" bg-transparent"
                    >
                      {name}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <Button
        type="submit"
        className="w-full text-sm font-semibold h-[53px]"
        disabled={isPending}
        isLoading={isPending}
        loadingText="Creating profile..."
      >
        Make my profile
      </Button>

      <p className="text-center mb-4">
        By clicking &quot;make my profile&quot; you agree to our privacy terms,
        code of conduct and Conditions.
      </p>
    </form>
  )
}
