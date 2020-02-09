describe('aplikacja', () => {
  it('działa', () => {
    expect(1).toBe(1)
  })
})

if (process.env.PANKLEKS === 'true') {
  describe('kalkulator', () => {
    it('działa', () => {
      expect(1 + 1).toBe(2)
    })
  })
}
