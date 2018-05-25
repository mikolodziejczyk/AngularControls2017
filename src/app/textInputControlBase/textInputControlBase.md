# TextInputControlBase

The base for primitive type controls, like number, integer, string.

Allows specifying own input template, but if not specified, generates one automatically.

## Deriving from TextInputControlBase

### ngOnDestroy()
Call the base implementation.

### valueToString()
Converts a cooked value to its string representation. The default implementation calls toString()

### updateValueAndState()
Add implementation that parses the input to the cooked value.
Call the base first, it updates `isEmpty`.

### updateInternalValidators()
Add implementation that runs any internal value validation.
Call the base first, it adds required error.

### control state
A set of flags, like `isEmpty`, reflecting the value state after `updateValueAndState()`
