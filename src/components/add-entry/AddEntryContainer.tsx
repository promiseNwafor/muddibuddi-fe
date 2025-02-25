import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { CalendarIcon, ClockIcon, Pencil } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'
import { MoodEntryFormValues, MoodEntrySchema } from '@/utils/schema'
import { useAddMoodEntryMutation } from '@/services/mood/moodQuery'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

const AddEntryContainer = () => {
  const [addMoodEntry, { isLoading }] = useAddMoodEntryMutation()

  const form = useForm<MoodEntryFormValues>({
    resolver: zodResolver(MoodEntrySchema),
    defaultValues: {
      moodText: '',
      time: format(new Date(), 'HH:mm'),
    },
  })

  const onSubmit = async (values: MoodEntryFormValues) => {
    try {
      const dateTime = new Date(values.date)
      const [hours, minutes] = values.time.split(':')
      dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10))

      const formattedValues = {
        moodText: values.moodText,
        entryDateTime: dateTime.toISOString(),
      }

      await addMoodEntry(formattedValues).unwrap()
      toast.success('Entry added successfully!')
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="min-h-screen bg-background space-y-5">
      <h1 className="text-3xl font-bold">Add New Entry</h1>
      <div className="mx-auto">
        <Card className="bg-primary text-accent border-accent">
          <CardHeader>
            <CardTitle>How are you feeling?</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="moodText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" />
                          Tell us about your mood
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe how you're feeling or what happened today..."
                          className="min-h-[200px] border-accent/45"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal bg-transparent border-accent/45 hover:bg-transparent hover:text-background',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="time"
                              className="pl-8 border-accent/45"
                              {...field}
                            />
                            <ClockIcon className="absolute left-2 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Entry'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddEntryContainer
