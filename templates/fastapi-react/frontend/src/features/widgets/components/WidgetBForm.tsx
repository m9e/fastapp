import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { WidgetBCreate, WidgetA, WidgetB } from '../../../types';
import { StyledForm, StyledTextField } from '../../../StyledComponents';

interface WidgetBFormProps {
  onSubmit: (widget: WidgetBCreate) => void;
  widgetAs: WidgetA[];
  initialData?: WidgetB;
}

const WidgetBForm: React.FC<WidgetBFormProps> = ({ onSubmit, widgetAs, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [widget_a_id, setWidgetAId] = useState<number | null>(initialData?.widget_a_id || null);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setWidgetAId(initialData.widget_a_id || null);
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

    if (description && description.length > 200) {
      newErrors.description = 'Description must be 200 characters or less';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name,
        description: description || undefined,
        widget_a_id: widget_a_id || undefined,
      });
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
        fullWidth
      />
      <StyledTextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        fullWidth
        multiline
        rows={4}
      />
      <FormControl fullWidth>
        <InputLabel id="widget-a-select-label">Widget A (Optional)</InputLabel>
        <Select
          labelId="widget-a-select-label"
          value={widget_a_id || ''}
          onChange={(e) => setWidgetAId(e.target.value as number | null)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {widgetAs.map((widgetA) => (
            <MenuItem key={widgetA.id} value={widgetA.id}>
              {widgetA.name} ({widgetA.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {initialData ? 'Update' : 'Create'} Widget B
      </Button>
    </StyledForm>
  );
};

export default WidgetBForm;