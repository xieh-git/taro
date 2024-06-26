import * as Taro from '@tarojs/taro-h5'

import { buildApp } from '../utils'

const mockConsole = require('jest-mock-console')

describe('navigation', () => {
  describe('setNavigationBarTitle', () => {
    beforeEach(() => {
      mockConsole()
    })

    test('options should be object', () => {
      expect.assertions(2)
      return Promise.all([
        Taro.setNavigationBarTitle()
          .catch(err => {
            const expectErrMsg = 'setNavigationBarTitle:fail parameter error: parameter should be Object instead of Undefined'
            // expect(console.error).toHaveBeenNthCalledWith(1, expectErrMsg)
            expect(err.errMsg).toMatch(expectErrMsg)
          }),
        Taro.setNavigationBarTitle(null)
          .catch(err => {
            const expectErrMsg = 'setNavigationBarTitle:fail parameter error: parameter should be Object instead of Null'
            // expect(console.error).toHaveBeenNthCalledWith(2, expectErrMsg)
            expect(err.errMsg).toMatch(expectErrMsg)
          })
      ])
    })

    test('options.title should be string', () => {
      const success = jest.fn()
      const fail = jest.fn()
      const complete = jest.fn()

      expect.assertions(5)
      return Taro.setNavigationBarTitle({
        success,
        fail,
        complete
      })
        .then(() => {
          const expectErrMsg = 'setNavigationBarTitle:fail parameter error: parameter.title should be String instead of Undefined'
          expect(success.mock.calls.length).toBe(0)
          expect(fail.mock.calls.length).toBe(1)
          expect(fail.mock.calls[0][0]).toEqual({ errMsg: expectErrMsg })
          expect(complete.mock.calls.length).toBe(1)
          expect(complete.mock.calls[0][0]).toEqual({ errMsg: expectErrMsg })
          // expect(console.error).toHaveBeenCalledWith(expectErrMsg)
          // expect(err.errMsg).toMatch(expectErrMsg)
        })
    })

    test('should save to setNavigationBarTitle', () => {
      const title = 'bar'
      const success = jest.fn()
      const fail = jest.fn()
      const complete = jest.fn()

      expect.assertions(6)
      return Taro.setNavigationBarTitle({
        title,
        success,
        fail,
        complete
      })
        .then(res => {
          const expectMsg = 'setNavigationBarTitle:ok'
          expect(success.mock.calls.length).toBe(1)
          expect(success.mock.calls[0][0]).toEqual({ errMsg: expectMsg })
          expect(fail.mock.calls.length).toBe(0)
          expect(complete.mock.calls.length).toBe(1)
          expect(complete.mock.calls[0][0]).toEqual({ errMsg: expectMsg })
          expect(res.errMsg).toMatch(expectMsg)
        })
    })
  })
  describe('showNavigationBarLoading / hideNavigationBarLoading', () => {
    beforeEach(() => {
      mockConsole()
      buildApp()
    })

    test('should be able to showNavigationBarLoading / hideNavigationBarLoading', done => {
      Taro.showNavigationBarLoading().then(res => {
        expect(res.errMsg).toBe('showNavigationBarLoading:ok')
        const loadingElement = document.querySelector('.taro-navigation-bar-loading-show')
        expect(loadingElement).toBeTruthy()

        Taro.hideNavigationBarLoading().then(res => {
          expect(res.errMsg).toBe('hideNavigationBarLoading:ok')
          const loadingElement = document.querySelector('.taro-navigation-bar-loading-show')
          expect(loadingElement).toBeFalsy()
          done()
        })
      })
    })
  })
})
