import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url); // абсолютный путь к файлу
const __dirname = dirname(__filename); // абсолютный путь к директории

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // путь к фикстурам
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8'); // чтение фикстур

const extensions = ['yml', 'json'];
const expectedStylish = readFile('expected_stylish.txt');
const expectedPlain = readFile('expected_plain.txt');
const expectedJson = readFile('expected_json.txt');

test.each([extensions])('genDiff test', (ext) => {
  const fileBefore = getFixturePath(`file1.${ext}`);
  const fileAfter = getFixturePath(`file2.${ext}`);

  expect(genDiff(fileBefore, fileAfter, 'stylish')).toBe(expectedStylish);
  expect(genDiff(fileBefore, fileAfter, 'plain')).toBe(expectedPlain);
  expect(genDiff(fileBefore, fileAfter, 'json')).toBe(expectedJson);
  expect(genDiff(fileBefore, fileAfter)).toBe(expectedStylish);
});
