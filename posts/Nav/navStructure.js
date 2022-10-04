// import & set icons
import { FaReact } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineMenuBook as BookIcon } from 'react-icons/md'
import React from 'react'
import shortid from 'shortid'

const reactIcon = React.createElement(FaReact, {})
const plusIcon = React.createElement(AiOutlinePlus, {})

// menu structure
const navStructure = [
  {
    navItem: true,
    visible: true,
    icon: <BookIcon />,
    text: 'Content',
    link: '/post/table-of-content',
    menu: null,
    id: shortid()
  },
  {
    navItem: true,
    visible: true,
    icon: plusIcon,
    text: 'menu 1',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 1',
                iconLeft: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 1',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    }
                  ]
                },
                id: shortid()
              },
              {
                text: 'item in menu 1',
                iconLeft: '😎',
                menu: null,
                id: shortid()
              },
              {
                text: 'item in menu 1',
                iconLeft: '😎',
                menu: null,
                id: shortid()
              }
            ]
          },
          id: shortid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 1',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        }
      ]
    },
    id: shortid()
  },
  {
    navItem: true,
    visible: true,
    icon: plusIcon,
    text: 'menu 2',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 2',
                iconLeft: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 2',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    }
                  ]
                },
                id: shortid()
              },
              {
                text: 'item in menu 2',
                iconLeft: '😎',
                menu: null,
                id: shortid()
              },
              {
                text: 'item in menu 2',
                iconLeft: '😎',
                menu: null,
                id: shortid()
              }

            ]
          },
          id: shortid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 2',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        }
      ],
      id: shortid()
    },
    id: shortid()
  },
  {
    navItem: true,
    visible: true,
    icon: plusIcon,
    text: 'menu 3',
    menu: {
      visible: true,
      menuItems: [
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: {
            visible: false,
            menuItems: [
              {
                text: 'item in menu 3',
                iconLeft: '😎',
                menu: {
                  visible: false,
                  menuItems: [
                    {
                      text: 'long long long long long long long long text',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    },
                    {
                      text: 'item in menu 3',
                      iconLeft: reactIcon,
                      menu: null,
                      id: shortid()
                    }
                  ]
                },
                id: shortid()
              },
              {
                text: 'item in menu 3',
                iconLeft: '😎',
                menu: null,
                id: shortid()
              },
              {
                text: 'item in menu 3',
                iconLeft: '😎',
                menu: null,
                id: shortid()
              }

            ]
          },
          id: shortid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '',
          menu: null,
          id: shortid()
        },
        {
          text: 'item in menu 3',
          iconLeft: '😇',
          menu: null,
          id: shortid()
        }
      ],
      id: shortid()
    },
    id: shortid()
  }
]

export default navStructure
