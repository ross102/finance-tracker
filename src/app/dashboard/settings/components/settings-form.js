"use client"
import SubmitButton from "@/components/submit-button"
import Label from "@/components/label";
import DateRangeSelect from "@/components/date-range-select";
import Input from "@/components/input";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import { updateSettings } from "@/lib/action"
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
  error: false
}

export default function SettingsForm({ defaults }) {
    console.log(defaults);
    const [state, formAction] = useFormState(
      updateSettings,
      initialState,
    );
    return (
      <form className="space-y-4" action={formAction}>
        {state?.error && (
          <AlertError>{state?.message}</AlertError>
        )}
        {!state?.error && state?.message.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}
  
        <Label htmlFor="fullName">User full name</Label>
        <Input type="text" name="fullName" id="fullName" placeholder="User full name" defaultValue={defaults?.fullName} />
  
        <Label htmlFor="defaultView">Default transactions view</Label>
        <DateRangeSelect name="defaultView" id="defaultView" defaultValue={defaults?.defaultView} />
  
        <SubmitButton>Update Settings</SubmitButton>
      </form>
    );
  }
    