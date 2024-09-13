import React, { useState, useEffect } from 'react';
import { Button, FormHelperText } from '@mui/material';
import { WidgetA, WidgetACreate } from '../../../types';
import { StyledForm, StyledTextField } from '../../../StyledComponents';

interface WidgetAFormProps {
  onSubmit: (widget: WidgetACreate) => void;
  initialData?: WidgetA | null;
}

const WidgetAForm: React.FC<WidgetAFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (name.length > 50) {
      newErrors.name = 'Name must be 50 characters or less';
      isValid = false;
    }

    if (description.length > 200) {
      newErrors.description = 'Description must be 200 characters or less';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const widgetData: WidgetACreate = { name, description };
      onSubmit(widgetData);
      setName('');
      setDescription('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
      <StyledTextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary">
        {initialData ? 'Update' : 'Create'} Widget A
      </Button>
      <FormHelperText>* Required field</FormHelperText>
    </StyledForm>
  );
};

export default WidgetAForm;