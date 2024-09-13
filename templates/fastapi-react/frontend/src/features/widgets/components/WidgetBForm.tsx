import React, { useState, useEffect } from 'react';
import { Button, FormHelperText } from '@mui/material';
import { WidgetB, WidgetBCreate } from '../../../types';
import { StyledForm, StyledTextField } from '../../../StyledComponents';
import { createWidgetB } from '../api';

interface WidgetBFormProps {
  onSubmit: (widget: WidgetB) => void;
  initialData?: WidgetB | null;
  widgetAId: number;
}

const WidgetBForm: React.FC<WidgetBFormProps> = ({ onSubmit, initialData, widgetAId }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const widgetData: WidgetBCreate = { name, description, widgetAId };
      try {
        const createdWidget = await createWidgetB(widgetData);
        onSubmit(createdWidget);
        setName('');
        setDescription('');
      } catch (error) {
        console.error('Error creating Widget B:', error);
        // Handle error (e.g., show error message to user)
      }
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
        {initialData ? 'Update' : 'Create'} Widget B
      </Button>
      <FormHelperText>* Required field</FormHelperText>
    </StyledForm>
  );
};

export default WidgetBForm;