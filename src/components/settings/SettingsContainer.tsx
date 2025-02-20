import { useState } from 'react'
import { Bell, User, Shield, CloudRain } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '../ui/input'

const SettingsContainer = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [weatherUnit, setWeatherUnit] = useState('celsius')

  return (
    <div className="space-y-5 min-h-screen">
      <h1 className="text-3xl font-bold ">Settings</h1>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Account Settings */}
        <Card className="bg-primary text-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Email Address</label>
              <Input
                type="email"
                className="p-2 border rounded-md"
                value="user@example.com"
                disabled
              />
            </div>
            <Button className="bg-background hover:bg-background/90 text-primary">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-[#0f0f1a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how and when you want to receive reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Mood Check-in Reminder</p>
                <p className="text-sm text-gray-500">
                  Receive a daily reminder to log your mood
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Insights</p>
                <p className="text-sm text-gray-500">
                  Get weekly summary of your mood patterns
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Weather Settings */}
        <Card className="bg-primary text-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="h-5 w-5" />
              Weather Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Temperature Unit</p>
                <p className="text-sm text-gray-500">
                  Choose your preferred temperature scale
                </p>
              </div>
              <Select value={weatherUnit} onValueChange={setWeatherUnit}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Location Services</p>
                <p className="text-sm text-gray-500">
                  Allow automatic weather updates based on location
                </p>
              </div>
              <Switch
                className="bg-secondary"
                style={{ background: '#ffa100' }}
                defaultChecked
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-[#0f0f1a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-sm text-gray-500">
                  Share anonymous data to improve mood predictions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="destructive" className="w-full mt-4">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsContainer
