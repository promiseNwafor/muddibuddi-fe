import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Calendar, Pencil } from 'lucide-react'
import { MoodEntryFormValues, MoodEntrySchema } from '@/utils/schema'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
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

// Updated schema for the new form structure

const AddEntryContainer = () => {
  const form = useForm<MoodEntryFormValues>({
    resolver: zodResolver(MoodEntrySchema),
    defaultValues: {
      moodText: '',
      dateTime: new Date().toISOString().slice(0, 16), // Format: "2025-02-15T14:48"
    },
  })

  const onSubmit = async (values: MoodEntryFormValues) => {
    try {
      // Convert the datetime to ISO format with seconds and milliseconds
      const entryDateTime = new Date(values.dateTime).toISOString()

      const formattedValues = {
        moodText: values.moodText,
        entryDateTime,
      }

      console.log('Form submitted:', formattedValues)
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
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

                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date and Time
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          className="border-accent/45"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
