
export default {
    name: 'featured',
    title: 'Featured Menu categories',
    type: 'document',
    fields: [
      {
        name: "name",
        type: "string",
        title: "Featured category name",
        validation: (Rule) => Rule.required(),
      }, 
      {
        name: "short_description",
        type: "string",
        title: "Short description",
        validation: (Rule) => Rule.max(200)
      },
      {
        name: "restaurantes",
        type: "array",
        title: "Restaurantes",
        of: [
          { type: 'reference', to: [ { type: 'restaurant'} ]}
        ]
      },
    ]
  }
  