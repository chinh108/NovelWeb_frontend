import React from "react";
import { Controller } from "react-hook-form";

const Checkbox = (props: any) => (
  <Controller
    {...props}
    render={({ field }) => {
      return (
        <input
          {...field}
          type="checkbox"
          value={props.value}
          checked={field.value === props.value}
          onChange={(event) => {
            field.onChange(event.target.checked ? props.value : undefined);
          }}
        />
      );
    }}
  />
);

export default Checkbox;
