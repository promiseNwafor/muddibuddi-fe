import React from 'react'
import { Bell, User, Shield, Sun, CloudRain } from 'lucide-react'
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
import { Switch } from '../ui/switch'

const SettingsContainer = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [theme, setTheme] = React.useState('system')
  const [weatherUnit, setWeatherUnit] = React.useState('celsius')

  return (
    <div className="space-y-5">
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
              <input
                type="email"
                className="p-2 border rounded-md"
                value="user@example.com"
                disabled
              />
            </div>
            <Button className="bg-background text-primary">
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

      {/* Display Settings */}
      <Card className="bg-[#0f0f1a]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Display Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-gray-500">
                Choose your preferred theme
              </p>
            </div>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

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
              <Switch defaultChecked />
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
