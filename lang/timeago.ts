export const esFunc = function (number: number, index: number): [string, string] {
  return [
    ['justo ahora', 'en un rato'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'en %s horas'],
    ['hace 1 día', 'en 1 día'],
    ['hace %s días', 'en %s días'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['hace 1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años'],
  ][index] as [string, string];
}

export const ptFunc = function (number: number, index: number): [string, string] {
  return [
    ['agora mesmo', 'agora'],
    ['há %s segundos', 'em %s segundos'],
    ['há um minuto', 'em um minuto'],
    ['há %s minutos', 'em %s minutos'],
    ['há uma hora', 'em uma hora'],
    ['há %s horas', 'em %s horas'],
    ['há um dia', 'em um dia'],
    ['há %s dias', 'em %s dias'],
    ['há uma semana', 'em uma semana'],
    ['há %s semanas', 'em %s semanas'],
    ['há um mês', 'em um mês'],
    ['há %s meses', 'em %s meses'],
    ['há um ano', 'em um ano'],
    ['há %s anos', 'em %s anos'],
  ][index] as [string, string];
}