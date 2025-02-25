import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { UserFormValues, UserSchema } from '@/utils/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const RegisterContainer = () => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
  })

  const handleSubmit = (values: UserFormValues) => {
    console.log(values)
  }

  return (
    <div className="min-h-screen p-4 center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-[400px]"
        >
          <Card className="border-gray-300 bg-transparent">
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-accent"
                        type="username"
                        placeholder="Amy"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-accent"
                        type="email"
                        placeholder="amy@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-accent"
                        placeholder="*******"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="space-y-6 w-full pt-4">
                <Button type="submit" variant="full">
                  Submit
                </Button>
                <Button variant="ghost" className="w-full">
                  <FcGoogle />
                  Register with Google
                </Button>
                <div className="w-full flex justify-between text-sm">
                  <p>Already have an account?</p>
                  <Link to="/login" className="text-md ml-1 link">
                    Sign in
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default RegisterContainer
