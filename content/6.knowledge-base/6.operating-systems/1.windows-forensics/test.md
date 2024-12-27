# Edge Case Test for `../public`

This is a simple Markdown document to test the regex replacement of `../public`.

## 1. Regular Image Path
![Image](../../../../public/images/logo.png)

## 2. URL with `../public` (this should **not** be replaced)
![Image](https://example.com/../public/images/logo.png)

## 3. Text containing `../public` (this should **not** be replaced)
This is just a regular sentence with `../public` in it, which should not be affected by the regex replacement.

## 4. Markdown Link with `../public` (this should  be replaced)
[Link to Image](../../../../public/images/logo.png)

## 5. File Path with Special Characters (should not match)
Here is a file path with a space: `../../../../public/images/My Image.png`.

## 6. `../public` in a Code Block (should **not** be replaced)
```bash
echo ../../../../public/images/logo.png
```

## 7. Non-Relative Path with `../public` (should **not** be replaced)
This is an absolute file path: `file:///../../public/images/logo.png`.

## 8. Multiple `../public` in a Path (this should **be** replaced)
Here is a complex path: `../../../../public/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png`

## 9. `../public` in a List Item (should **be** replaced)
- ![Image](../../../../public/images/logo.png)

## Explanation of the Edge Cases:

1. **Regular Image Path**: A typical relative path that should be modified.
2. **URL with `../public`**: A URL that includes `../public` which should **not** be modified.
3. **Text containing `../public`**: Plain text with `../public`, which should **not** be modified.
4. **Markdown Link with `../public`**: A Markdown link that starts with `../` and includes `public`, which should * be modified.
5. **File Path with Special Characters**: A file path containing a space, which should not match the regex.
6. **`../public` in a Code Block**: A code block with `../public` should not be modified.
7. **Non-Relative Path with `../public`**: An absolute path starting with `file:///`, which should not be modified.
8. **Multiple `../public` in a Path**: A more complex path with multiple instances of `../public`, which should be modified.
9. **`../public` in a List Item**: A path in a list item that should be modified.

### Instructions:
- Save this content into a file called `test.md`.
- Run your Perl command on this file (`perl -i -p -e 's/(\.\.\/)+public//g' test.md`).
- Check the output to ensure the right cases were modified and the others remained unchanged.

This test file should cover all the edge cases you're concerned about. Let me know how the testing goes or if you need any further adjustments!
