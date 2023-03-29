import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { Button, Typography, TextField, Box } from '@mui/material';

const FieldArrayComponent = ({
    label,
    fields,
    addButtonText,
    removeButtonText,
    ...props
  }) => (
    <FieldArray {...props} component={({ fields: array, meta: { error, submitFailed } }) => (
      <Fragment>
        <Button
          onClick={() => array.push({})}
          buttonText={addButtonText}
        />
        {(submitFailed && error) && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}
        {array.map((item, index) => (
          <Box
            key={index}
            marginY={2}
            p={1}
            bgcolor="#efefef"
            borderRadius={4}
          >
            <Typography variant="h5">
              {label} {index + 1}
            </Typography>
            {fields.map(field => (
              <TextField
               name={`${item}.${field.name}`}
               type={field.type}
               label={field.label}
             />
            ))}
            <Button
              onClick={() => array.remove(index)}
              buttonText={removeButtonText}
            />
          </Box>
        ))}
        {Boolean(array.length) && (
          <Button
            onClick={() => array.push({})}
            buttonText={addButtonText}
          />
        )}
      </Fragment>
    )} />
  );
  
  FieldArrayComponent.propTypes = {
    addButtonText: PropTypes.string,
    removeButtonText: PropTypes.string,
    label: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };
  
  FieldArrayComponent.defaultProps = {
    addButtonText: 'Add',
    removeButtonText: 'Remove',
  };
  
  export default FieldArrayComponent;
  