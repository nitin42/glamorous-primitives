import isPrimitiveProp from './is-primitive-prop'

export default function shouldForwardProperty(rootEl, propName) {
  return typeof rootEl !== 'string' && !isPrimitiveProp(rootEl, propName)
}
