# 💅 styled-addons

### styled-components theming and more 💅 🔥

This library exists to make woroking with styled-components simpler.  
Use theme variable names (or any other prop) and let styled-addons generate binding functions for you!

### [Read on Medium](https://medium.com/@vladislavzhabinsky/theming-styled-components-and-creating-styling-add-ons-7adea0290b6d)

# Example
```
import styledProps from 'styled-addons'

const Button = styledProps ('button')`
    font-size: 15px;
    color: $theme.color;
    background: $theme.background;
`;

export default Button;
```

# How to?

```
npm i --save styled-addons 
```
```
import styledProps from 'styled-addons'
import {ThemeProvider} from 'styled-components';

const Button = styledProps ('button')`
    font-size: 15px;
    color: $theme.color;
    background: $theme.background;
`;

const App = ({}) => {
	return (
		<ThemeProvider theme={{abc: 'red'}}>
			<Button>hey</Button>
		</ThemeProvider>
	)
}

```


# How does it work ?

- You write code like this
```
styledProps(...)`
  color: $theme.abc;
`
```

- It gets transformed into this under the hood

```
styledProps(...)`
  color: ${props => props.theme.abc};
`
```

# Contribute
It would be great to build a set of styled-components addons.  
Fork and submit a PR or text me at vladislavzhabinsky@gmail.com