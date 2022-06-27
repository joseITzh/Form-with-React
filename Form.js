import React, {useState} from "react";
import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";



// Schema validation.
const SignupSchema = yup.object().shape({
    // Needs to be a string and it has to be required.
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    // An age can't be a negative number ".positive()"
    numberPeople: yup.number().required().positive().integer(),
    // The form won't be submitted until you have provided all the fields.
  });


  
  function Form() {
    const {
      register, // The Register function is to determine which fields we want to be part of our validation.
      handleSubmit, /**  handleSubmit is a function that we can put as the unsubmit of our form so that when we submit the form, We can say to submit 
      this and use for the react hook library that will handle everything.*/
      formState: { errors }
    } = useForm({
      resolver: yupResolver(SignupSchema) // Connect yup to react hook form.
    });
    const [date, setDate] = useState(setHours(setMinutes(new Date(), 30), 17))
    const onSubmit = (data) => {
      alert(JSON.stringify(data));
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} class="bg_image">
        <div>
          <label>First Name</label>
          <input {...register("firstName")} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Last Name</label>
          <input {...register("lastName")} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div>
            <label>Email address</label>
            <input {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Number of people</label>
          <input type="number" {...register("numberPeople", { valueAsNumber: true })} />
          {errors.numberPeople && <p>{errors.numberPeople.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
            <DatePicker selected={date} onChange={(date) =>
            setDate(date)} id="exampleFormControlInput1"
            name="date" className="form-control" dateFormat="MMMM d, yyyy h:mm aa" withPortal 
            // minTime is used to set the minimum selectable time 8 AM, when the company opens.
            showTimeSelect minTime={setHours(setMinutes(new Date(), 0), 8)}
            // maxTime is used to set the maximun selectable time 6 PM, company closes at 7 PM so the last booking must be made for 6 PM.
            maxTime={setHours(setMinutes(new Date(), 0), 18)}/>
        </div>
        <div>
          <label>Additional comments</label>
          <textarea {...register("comments")} />
        </div>
        <input type="submit" value="Book session"/>
      </form>
    );
  }

export default Form;

