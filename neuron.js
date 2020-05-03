class Neuron {
  constructor(params) {
    this.w = {
      a: 1,
      b: 0,
    }
    this.divisor = params.divisor || 100
    this.maxIterations = params.iterations || 100
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

  train(values) {
    var iterations = []

    for (var r = 0; r <= this.maxIterations; r++) {
      iterations.push(this.weights())
      values.forEach((value) => {
        // value.result = this.result(value.input)
        this.modifyWs(value.input, value.expectedOutput)
      })
    }

    return iterations
  }

}