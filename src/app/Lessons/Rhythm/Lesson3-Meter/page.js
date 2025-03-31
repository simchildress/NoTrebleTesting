"use client";

export default function Meter(){

    return (
        
        <main style={{ /*backgroundColor: '#455090e2'*/ }} >
            <div style={{ maxWidth: '800px', margin: 'auto', paddingLeft: 40, paddingRight: 40 }} className="lesson-div" >
                <h2>Meter and time signatures</h2>

                <p>Meter involves the way multiple pulse layers work together to organize music in time. Standard meters in Western music can be classified into <em>simple meters</em> and <em>compound meters</em>, as well as <em>duple</em>, <em>triple</em>, and <em>quadruple</em> meters. </p>

                <p>Duple, triple, and quadruple classifications result from the relationship between the counting pulse and the pulses that are <em>slower</em> than the counting pulse. In other words, it is a question of <em>grouping</em>: how many beats occur in each bar. If counting-pulse beats group into twos, we have duple meter; groups of three, triple meter; groups of four, quadruple meter. Conducting patterns are determined based on these classifications. </p>

                <p>Simple and compound classifications result from the relationship between the counting pulse and the pulses that are <em>faster</em> than the counting pulse. In other words, it is a question of <em>division</em>: does each beat divide into two equal parts, or three equal parts. Meters that divide the beat into two equal parts are <em>simple meters</em>; meters that divide the beat into three equal parts are <em>compound meters</em>. </p>

                <p>Thus, there are six types of standard meter in Western music:</p>

                <p><li>simple duple (beats group into two, divide into two)</li></p>
                <p><li>simple triple (beats group into three, divide into two)</li></p>
                <p><li>simple quadruple (beats group into four, divide into two)</li></p>
                <p><li>compound duple (beats group into two, divide into three)</li></p>
                <p><li>compound triple (beats group into three, divide into three)</li></p>
                <p><li>compound quadruple (beats group into four, divide into three)</li></p>

                <p>In a time signature, the <em>top number</em> (and the top number only!) describes the type of meter. Following are the top numbers that always correspond to each type of meter:</p>

                <p><li>simple duple: 2</li></p>
                <p><li>simple triple: 3</li></p>
                <p><li>simple quadruple: 4</li></p>
                <p><li>compound duple: 6</li></p>
                <p><li>compound triple: 9</li></p>
                <p><li>compound quadruple: 12</li></p>


                <h4> Notating meter</h4>

                <p>In <em>simple meters</em>, the bottom number of the time signature corresponds to the type of note corresponding to <em>a single beat</em>. If a simple meter is notated such that each quarter note corresponds to a beat, the bottom number of the time signature is 4. If a simple meter is notated such that each half note corresponds to a beat, the bottom number of the time signature is 2. If a simple meter is notated such that each eighth note corresponds to a beat, the bottom number of the time signature is 8. And so on. </p>

                <p>In <em>compound meters</em>, the bottom number of the time signature corresponds to the type of note corresponding to <em>a single division of the beat</em>. If a compound meter is notated such that each dotted-quarter note corresponds to a beat, the eighth note is the division of the beat, and thus the bottom number of the time signature is 8. If a compound meter is notated such that each dotted-half note corresponds to a beat, the quarter note is the division of the beat, and thus the bottom number of the time signature is 4. Note that because the beat is divided into three in a compound meter, the beat is always three times as long as the division note, and <em>the beat is always dotted</em>.</p>


                <h4> Hearing meter</h4>

                <p>For a more detailed explanation of meter with an emphasis on hearing and recognizing standard meters, see the following two videos:</p>

                <iframe src="https://player.vimeo.com/video/127952221" style={{ width: "500", height: "281", frameborder: "0" }}></iframe> <p class="caption"><a href="https://vimeo.com/127952221">Meter - counting pulse</a> from <a href="https://vimeo.com/user11692346">Kris Shaffer</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

                <iframe src="https://player.vimeo.com/video/127955738" style={{ width: "500", height: "281", frameborder: "0" }}></iframe> <p class="caption"><a href="https://vimeo.com/127955738">Meter - grouping and division</a> from <a href="https://vimeo.com/user11692346">Kris Shaffer</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

                <p>Following are the musical examples referenced in the above videos:</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:2GnWmYszHAtRKJeODAXuT2" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"Come Out Clean," Jump Little Children</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:5JGEAz15LkPoOtFHttDtVs" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"With or Without You," U2</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:40J9dEDG0unV6LyYOHfMi9" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"The Tourist," Radiohead</p>

                <h4> Examples</h4>

                <h3>Simple duple meter</h3>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:7GGgQvI5OOv1GL9wehJC2w" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">Symphony No. 5, Movement IV., Ludwig van Beethoven</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:1mblryRrYNlSJqvrrtvzyq" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"Idioteque," Radiohead</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:3QKUA7OAaQu3Zl1cqMa9gq" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">Sonata No. 1 in F Minor, Op. 2, No. 1, Movement I., Ludwig van Beethoven</p>


                <h3>Simple triple meter</h3>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:3kxQTMpuCVX5L34GjHy61h" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">String Quartet No. 15 in D Minor, K. 421, Movement III., Wolfgang A. Mozart</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:6T5JlpcvC0RbPpexl8xXMI" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">Symphony No. 90 in C Major, Hob: I:90, Movement III., Joseph Haydn</p>



                <h3>Simple quadruple meter</h3>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:5JGEAz15LkPoOtFHttDtVs" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"With or Without You," U2</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:2GnWmYszHAtRKJeODAXuT2" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"Come Out Clean," Jump Little Children</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:0jXRQSoOA01VTmrVIDbhtm" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"Shh," Imogen Heap</p>


                <h3>Compound duple meter</h3>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:0qksx8mV28lztYIZ1om8ml" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true"}}></iframe><p class="caption">"Shiver," Radiohead</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:1w6C2YqIHygosg9OY6v7Wl" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true"}}></iframe><p class="caption">Strong Quartet No. 17 in B-flat Major, K. 458, "The Hunt," Movement I., Wolfgang A. Mozart</p>


                <h3>Compound triple meter</h3>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:40J9dEDG0unV6LyYOHfMi9" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"The Tourist," Radiohead</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:4mu9wgDkwUSbOGvx2iQfFf" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">Sonata No. 42 in G Major, Hob. XVI:27, Movement II., Joseph Haydn</p>


                <h3>Compound quadruple meter</h3>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:76ZDwA8uTyMys4LIS3pBUX" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">"Exogenesis: Symphony Part 3," Muse</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:70TI9J2rsGIuXyFqVzOswh" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">Sonata No. 14 in C-sharp Minor, Op. 27, No. 2, "Moonlight," Movement I., Ludwig van Beethoven</p>

                <iframe src="https://embed.spotify.com/?uri=spotify:track:6M1Eo5wuTl8f5qbpLCuph0" style={{ width: "300", height: "80", frameborder: "0", allowtransparency: "true" }}></iframe><p class="caption">St. Matthew Passion, No. 1, Chorus, "Kommt, ihr Töchter, helft mir klagen," J.S. Bach</p>

            </div>
        </main>

    );
}