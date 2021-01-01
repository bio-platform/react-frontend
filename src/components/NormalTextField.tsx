import { TextField } from "@material-ui/core"
import React from "react"

type Props = {
    label: React.ReactNode;
    required?: boolean;
    onChange: (value: string) => void;
    autoComplete?: string;
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    helperText?: React.ReactNode;
    id?: string;
    multiline?: boolean;
    name?: string;
    placeholder?: string;
    rows?: string | number;
    rowsMax?: string | number;
    size?: 'small' | 'medium';
    value: number | string;
    variant?: 'standard' | 'outlined' | 'filled';
    type?: React.InputHTMLAttributes<unknown>['type'];
}

export const NormalTextField = (props: Props) => {
    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
    }

    return (
        <TextField label={props.label}
            required={props.required}
            onChange={handleValueChange}
            autoComplete={props.autoComplete}
            color={props.color}
            disabled={props.disabled}
            error={props.error}
            fullWidth={props.fullWidth}
            helperText={props.helperText}
            id={props.id}
            multiline={props.multiline}
            name={props.name}
            placeholder={props.placeholder}
            rows={props.rows}
            rowsMax={props.rowsMax}
            size={props.size}
            value={props.value}
            type={props.type}
            variant={props.variant} />
    )
}