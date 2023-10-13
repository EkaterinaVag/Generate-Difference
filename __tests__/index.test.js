import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url); // абсолютый путь к файлу
const __dirname = dirname(__filename); // абсолютный путь к директории

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // путь к фикстурам
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8'); // чтение фикстур

test('genDiff JSON, stylish', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFile('expected_stylish.txt'));
});

test('genDiff YAML, stylish', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFile('expected_stylish.txt'));
});

test('genDiff JSON, plain', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFile('expected_plain.txt'));
});

test('genDiff YAML, plain', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFile('expected_plain.txt'));
});

test('genDiff JSON, json', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFile('expected_json.txt'));
});

test('genDiff YAML, json', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFile('expected_json.txt'));
});
