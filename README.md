

# NREL-branding
NREL branding components
- [NREL-branding](#nrel-branding)
  - [Installation](#installation)
  - [Components](#components)
    - [Header](#header)
      - [Props](#props)
    - [Footer](#footer)
      - [Props](#props-1)
    - [Menu](#menu)
      - [Props](#props-2)
    - [ExternalMenuLink](#externalmenulink)
      - [Props](#props-3)
    - [MenuLink](#menulink)
      - [Props](#props-4)
    - [MenuSpacer](#menuspacer)
    - [SubMenu](#submenu)
      - [Props](#props-5)

## Installation
`npm i nrel-branding`

## Components
### Header
The header component is a wrapper component that can be passed React components as children. Most commonly, this will be passed the `Menu` component included in this package along with it's corresponding children.

```js
  <Header appTitle="NREL Application Title">
    <Menu>
      <MenuLink to="/route">Link Title</MenuLink>
      <MenuLink to="/another-route">Another Link Title</MenuLink>
    </Menu>
  </Header>
```

#### Props
| Name         | Type    | Default        | Description                                                                               |
| ------------ | ------- | -------------- | ----------------------------------------------------------------------------------------- |
| appTitle*    | node    |                | The title of the application                                                              |
| className    | string  |                | Add a class to be used for styling                                                        |
| logoSrc      | string  | NREL blue logo | The source of the logo image file. This should probably live in the public dir of the app |
| children     | node    |                | The nav bar. In general, this will be the `menu` component from this library              |
| noStick      | boolean | false          | Boolean determining if the menu bar should not be sticky to the top of the page           |
| isSlim       | boolean | false          | Boolean for slimmer headers. Mostly used dynamically for data-viewer pages                |
| hasMobileNav | boolean | false          | Boolean used to turn on a mobile nav when in mobile resolutions                           |

\* Required prop


### Footer
The footer component to be set at the bottom of the page.

```js
  <Footer />
```

#### Props
| Name      | Type   | Default | Description                        |
| --------- | ------ | ------- | ---------------------------------- |
| className | string |         | Add a class to be used for styling |


### Menu
The nav bar menu used to either navigate through the current application, link to external sites or for Auth.

```js
  <Menu>
    <MenuLink to="/route">Link Title</MenuLink>
    <ExternalMenuLink to="https://nrel.gov">NREL Homepage</ExternalMenuLink>
    <MenuSpacer />
    <CustomAuthComponent />
  </Menu>
```

#### Props
| Name              | Type    | Default | Description                                                                                                      |
| ----------------- | ------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| children*         | node    |         | Most likely this will be a series of `MenuLink`s or custom components                                            |
| className         | string  |         | Add a class to be used for styling                                                                               |
| isSubMenu         | boolean | false   | Boolean saying if the parent is the sub menu or a main menu                                                      |
| noStick           | boolean | false   | Boolean determining if the menu bar should not be sticky to the top of the page                                  |
| scrollContainerId | string  |         | css selector id of container where scroll events occur on the dom. Used to apply the sticky class to the nav bar |

\* Required prop

### ExternalMenuLink
A navbar link to visit an external site

```js
  <ExternalMenuLink to="https://nrel.gov">NREL</ExternalMenuLink>
```

#### Props
| Name      | Type   | Default | Description                                            |
| --------- | ------ | ------- | ------------------------------------------------------ |
| to*       | URL    |         | Link destination                                       |
| children* | node   |         | JSX of HTML elements, or in most cases just label text |
| alt       | string |         | the link title (similar to an image alt tag)           |
| className | string |         | Add a class to be used for styling                     |

\* Required prop


### MenuLink
A navbar link to visit an  site

```js
  <MenuLink to="/data-viewer">Data Viewer</MenuLink>
```

#### Props
| Name      | Type   | Default | Description                                                                         |
| --------- | ------ | ------- | ----------------------------------------------------------------------------------- |
| to*       | URL    |         | Link destination                                                                    |
| children* | node   |         | JSX of HTML elements, or in most cases just label text                              |
| className | string |         | Add a class to be used for styling                                                  |
| isCurrent | bool   | false   | Whether or not this is active, default (undefined) will infer from the current path |

\* Required prop


### MenuSpacer
Adds space between menu items. Generally used between nav buttons on the left of the nav bar and the auth buttons on the right.

```js
  <MenuSpacer />
```

### SubMenu
A dropdown menu to show multiple links under one nav bar label.

```js
  <SubMenu label="Key Findings">
    <MenuLink to="/key-findings/scenarios">Scenarios</MenuLink>
    <MenuLink to="/key-findings/topics">Topics</MenuLink>
  </SubMenu>
```

#### Props
| Name      | Type   | Default | Description                                                           |
| --------- | ------ | ------- | --------------------------------------------------------------------- |
| label*    | string |         | Nav button label                                                      |
| children* | node   |         | Most likely this will be a series of `MenuLink`s or custom components |
| className | string |         | Add a class to be used for styling                                    |

\* Required prop