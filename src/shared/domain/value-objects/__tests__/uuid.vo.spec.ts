import { InvalidUuidError, Uuid } from "../uuid.vo"
import { validate as uuidValidate } from 'uuid'

describe('Uuid unit Tests', () => {

  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  test('should throw error when uuid id invalid', () => {

    expect(() => {
      new Uuid('invalid-uuid')
    }).toThrowError(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should create a valid uuid', () => {

    const uuid = new Uuid()
    expect(uuid.id).toBeDefined()
    expect(uuidValidate(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should accept a valid uuid', () => {

    const uuid = new Uuid('305b9dc1-e120-44ce-af43-3cee4b992aa1')
    expect(uuid.id).toBe('305b9dc1-e120-44ce-af43-3cee4b992aa1')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})