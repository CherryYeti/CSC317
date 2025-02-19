# CSC 317 Assignment 2 Submission

**Name:** Jason Javandel
**Student ID:** 922694055
**GitHub Username:** cherryyeti  
**Assignment Number:** 2  


##  HTML Personal Portfolio Website Assignment

### Description:
This assignment was to create a basic HTML portfolio, and experiment with semantics and good practices. Mainly, the content of the website is trying to make yourself appeal to employers while showing off your skills.


## Approach / What I Did:
- For this project, the structure was mostly predefined by the instructor, so I didn't have to think too much about the overall layout.
- In terms of structuring elements, I always placed alt text beneath the images as a best practice.
- 

## Code Explanation:

```html
<iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=-122.48618602752687%2C37.718972229628875%2C-122.47671246528627%2C37.73013144497156&amp;layer=mapnik" style="border: 1px solid black"></iframe>
```

This was an iframe that I grabbed via OpenStreetMap. I also posted instructions in the Discord on how to get the iframe for anyone else who wants it.



```html
<img src="images/holly.jpg" alt="A picture of a black cat on a couch" style="width:30vw; max-width: 400px;">
```

This was how I made my images responsive to a certain extent. Usually, I usually use tailwind, where the classes would be `w-1/3 max-w-lg`, which would functionally do a very similar thing.



```html
<a href="https://github.com/cherryyeti/FireStarter" style="color: red;" rel="noreferrer" target="_blank">You can view the source code here!</a>
```

Because I gave my page a full black background (not recommended I know), I needed to style the links in a way that they would be readable. The `rel="noreferrer"` is telling github that there is no referrer, and the `target="_blank"` opens the link in a new tab.



```html
<input type="text" name="email" placeholder="Email"  pattern="\w+@\w+\.\w+" required>
```

The regex for this pattern essesntially boiled down to `word+@+word+.+word`, which should do a decent enought job of validating that the user is actuaally inputting an email.