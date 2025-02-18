import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Calendar, Clock, Pencil } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { MoodEntryFormValues, MoodEntrySchema } from '@/utils/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const AddEntryContainer = () => {
  const form = useForm<MoodEntryFormValues>({
    resolver: zodResolver(MoodEntrySchema),
    defaultValues: {
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
  })

  const onSubmit = async (values: MoodEntryFormValues) => {
    try {
      console.log('Form submitted:', values)
      // 1. Send the data to your backend
      // 2. Process the description through your LLM
      // 3. Handle the response
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background space-y-5">
      <h1 className="text-3xl font-bold ">Add New Entry</h1>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" />
                          Tell us about your mood or what happened
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe how you're feeling or what happened today. For example: 'I had a great presentation at work and my colleagues loved it!' or 'Feeling overwhelmed with deadlines approaching'"
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
                      <FormItem>
                        <FormLabel>
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="border-accent/45"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Time
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="border-accent/45"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="secondary">
                    Save Entry
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
