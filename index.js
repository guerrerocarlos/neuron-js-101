const abs = Math.abs
const c2f = (c) => 1.8 * c + 32

class Neurona {
  constructor(params) {
    this.w = {
      a: 1,
      b: 0,
    }
    this.divisor = params.stepSize
  }

  weights() {
    return Object.assign({}, this.w)
  }

  test(x, w) {
    return w.a * x + w.b
  }

  result(x) {
    return this.test(x, this.w)
  }

  modifyWs(inputValue, expectedValue) {
    Object.keys(this.w).forEach((weightName) => {
      var currentError = abs(expectedValue - this.result(inputValue))

      var diff = currentError / this.divisor
      var testsW = Object.assign({}, this.w)

      testsW[weightName] = this.w[weightName] + diff
      var errorUp = abs(expectedValue - this.test(inputValue, testsW))
      testsW[weightName] = this.w[weightName] - diff
      var errorDown = abs(expectedValue - this.test(inputValue, testsW))

      if (errorUp < errorDown) {
        this.w[weightName] += diff
      } else {
        this.w[weightName] -= diff
      }
    })
  }

  train(values, maxIterations) {
    var iterations = []

    for (var r = 0; r < maxIterations; r++) {
      iterations.push(this.weights())
      values.forEach((value) => {
        value.result = this.result(value.input)
        this.modifyWs(value.input, value.expectedOutput)
      })
    }

    return iterations
  }

}

function getIterations() {
  var values = []
  for (var i = 0; i < 10; i += 1) {
    values.push({
      input: i,
      expectedOutput: c2f(i)
    })
  }

  var neurona = new Neurona({
    stepSize: 100
  })

  var iterations = neurona.train(values, 300)

  console.table(iterations)

  // console.log(neurona.weights())

  return { objective: { a: 1.8, b: 32 }, all: iterations }
}


