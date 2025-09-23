import React from 'react'
import PropTypes from 'prop-types'
import { Box, Input } from '@chakra-ui/react'

export const CarInput = ({ onPickupChange, onDropoffChange, pickupValue, dropoffValue }) => {
  return (
    <Box>
        <Input 
          placeholder='Pick up location' 
          size='md' 
          value={pickupValue || ''}
          onChange={(e) => onPickupChange && onPickupChange(e.target.value)}
        />
        <Input 
          placeholder='Drop off location' 
          size='md' 
          value={dropoffValue || ''}
          onChange={(e) => onDropoffChange && onDropoffChange(e.target.value)}
        />
    </Box>
  )
}

CarInput.propTypes = {
  onPickupChange: PropTypes.func,
  onDropoffChange: PropTypes.func,
  pickupValue: PropTypes.string,
  dropoffValue: PropTypes.string,
};
