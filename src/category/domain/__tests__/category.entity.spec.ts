import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {

  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  })

  describe('constructor', () => {

    test('should create a category with default value', () => {

      const category = new Category({
        name: 'Movie'
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test('should create a category with all values', () => {

      const created_at = new Date()
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBe(created_at)
    })

    test('should create a category with name and description', () => {

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
    })
  })

  describe('create command', () => {

    test('should create a category', () => {

      const category = Category.create({
        name: 'Movie'
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test('should create a category with description', () => {

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBeTruthy()
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test('should create a category with is_active', () => {

      const category = new Category({
        name: 'Movie',
        is_active: false
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBeFalsy()
      expect(category.created_at).toBeInstanceOf(Date)
    })
  })

  describe('category_id field', () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() }
    ]

    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any
      })

      expect(category.category_id).toBeInstanceOf(Uuid)

      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })

  describe('other methods', () => {

    test('should change name', () => {

      const category = Category.create({
        name: 'Movie'
      })

      category.changeName('Series')

      expect(category.name).toBe('Series')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    test('should change description', () => {

      const category = Category.create({
        name: 'Movie',
        description: 'Movie description'
      })

      category.changeDescription('Series description')

      expect(category.description).toBe('Series description')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    test('should active a category', () => {

      const category = Category.create({
        name: 'Movie',
        is_active: false
      })

      category.activate()

      expect(category.is_active).toBeTruthy()
    })

    test('should disable a category', () => {

      const category = Category.create({
        name: 'Movie',
        is_active: true
      })

      category.deactivate()

      expect(category.is_active).toBeFalsy()
    })
  })

  describe('update Category method', () => {

    test('should update all attributes in Category', () => {
      
      const category = Category.create({
        name: 'Movie',
        description: 'Nice Movie'
      })

      category.updateCategory({
        name: 'Serie',
        description: 'Funny serie'
      })

      expect(category.name).toBe('Serie')
      expect(category.description).toBe('Funny serie')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    test('should update name of Category', () => {
      
      const category = Category.create({
        name: 'Movie',
        description: 'Nice Movie'
      })

      category.updateCategory({
        name: 'Serie'
      })

      expect(category.name).toBe('Serie')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    test('should update description of Category', () => {
      
      const category = Category.create({
        name: 'Movie',
        description: 'Nice Movie'
      })

      category.updateCategory({
        name: 'Movie',
        description: 'Funny serie'
      })

      expect(category.description).toBe('Funny serie')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })
  })
})

describe('Category Validator', () => {

  describe('create command', () => {

    test('should an invalid category with name property', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      })
    })

    expect(() => Category.create({ name: '' })).containsErrorMessages({
      name: ["name should not be empty",],
    })

    expect(() => Category.create({ name: 155 as any })).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    })

    expect(() => Category.create({ name: 't'.repeat(256) })).containsErrorMessages({
      name: [
        "name must be shorter than or equal to 255 characters",
      ],
    })
  })
})

